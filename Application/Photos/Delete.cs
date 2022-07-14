using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>> { }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IPhotoAccessor photoAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.photoAccessor = photoAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await this.context.Users.Include(x => x.Photo)
                    .FirstOrDefaultAsync(x => x.UserName == this.userAccessor.GetUserName());

                if(user == null) return null;

                var photo = user.Photo;

                if(photo == null) return null;

                var result = await this.photoAccessor.DeletePhoto(photo.Id);

                if (result == null) return Result<Unit>.Failure("Proble deleting photo");

                this.context.Photos.Remove(photo);

                var success = await this.context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Proble deleting photo from API");
            }
        }
    }
}
