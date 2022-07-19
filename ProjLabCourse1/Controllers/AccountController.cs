using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using ProjLabCourse1.DTOs;
using ProjLabCourse1.Services;
using System.Security.Claims;

namespace ProjLabCourse1.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly TokenService tokenService;
        private readonly IMapper mapper;
        private readonly DataContext context;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService, IMapper mapper, DataContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.mapper = mapper;
            this.context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await this.userManager.Users.Include(p => p.Photo)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await this.signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return await CreateUserObject(user);
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await this.userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken!");
                return ValidationProblem();
            }
            if (await this.userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username taken!");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await this.userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                await this.userManager.AddToRoleAsync(user, "AppUser");
                return await CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<GetUserDto>> GetCurrentUser()
        {
            var user = await this.userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            var userR = await this.context.Users.ProjectTo<GetUserDto>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == user.Id);
            userR.Token = await this.tokenService.CreateToken(user);
            userR.Roli = await this.userManager.GetRolesAsync(user);
            return userR;
        }


        private async Task<UserDto> CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = user?.Photo?.Url,
                Token = await this.tokenService.CreateToken(user),
                Username = user.UserName,
                Roli = await this.userManager.GetRolesAsync(user)
        };
        }
    }
}
