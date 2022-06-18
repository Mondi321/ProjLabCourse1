using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob", UserName = "bob", Email = "bob@test.com"},
                    new AppUser{DisplayName = "Tom", UserName = "tom", Email = "tom@test.com"},
                    new AppUser{DisplayName = "Jane", UserName = "jane", Email = "jane@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Ushqimet.Any()) return;

            var ushqimet = new List<Ushqimi>
            {
                new Ushqimi
                {
                    Emri = "Pizza",
                    Perberesit = "Djath, Sos, Pershute",
                    Cmimi = 4.50,
                },
                new Ushqimi
                {
                    Emri = "Hamburger",
                    Perberesit = "Mish i bluar, domate, tranguj, djath",
                    Cmimi = 2.50,
                },
                new Ushqimi
                {
                    Emri = "Sallate",
                    Perberesit = "Sallate e gjelber, Laker, Domate, Ullinj",
                    Cmimi = 4.00,
                },
            };

            await context.Ushqimet.AddRangeAsync(ushqimet);
            await context.SaveChangesAsync();
        }
    }
}
