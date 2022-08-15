using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProjLabCourse1.Services
{
    public class TokenService
    {
        private readonly IConfiguration config;
        private readonly UserManager<AppUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public TokenService(IConfiguration config, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            this.config = config;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public async Task<string> CreateToken(AppUser user)
        {
            var claims = await GetAllValidClaims(user);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config["TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(30),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private async Task<List<Claim>> GetAllValidClaims(AppUser user)
        {
            var options = new IdentityOptions();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var userClaims = await this.userManager.GetClaimsAsync(user);
            claims.AddRange(userClaims);

            var userRoles = await this.userManager.GetRolesAsync(user);

            foreach(var userRole in userRoles)
            {

                var role = await this.roleManager.FindByNameAsync(userRole);

                if(role != null)
                {
                    claims.Add(new Claim(ClaimTypes.Role, userRole));

                    var roleClaims = await this.roleManager.GetClaimsAsync(role);

                    foreach(var roleClaim in roleClaims)
                    {
                        claims.Add(roleClaim);
                    }
                }
            }
            return claims;
        }
    }
}
