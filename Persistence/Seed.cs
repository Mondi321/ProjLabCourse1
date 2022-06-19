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

            if (!context.Pijet.Any())
            {
                var pijet = new List<Pije>
                {
                    new Pije
                    {
                        Emri = "Pija 1",
                        Perberesit = "Perbersi1, perberesi2, perberesi3",
                        Cmimi = 1.50
                    },
                    new Pije
                    {
                        Emri = "Pija 2",
                        Perberesit = "Perbersi1, perberesi2, perberesi3",
                        Cmimi = 2.50
                    },
                    new Pije
                    {
                        Emri = "Pija 3",
                        Perberesit = "Perbersi1, perberesi2, perberesi3",
                        Cmimi = 2.00
                    },
                };
                await context.Pijet.AddRangeAsync(pijet);
            }

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

            if (!context.Ushqimet.Any())
            {
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
            }

            if (!context.Embelsirat.Any())
            {
                var embelsirat = new List<Embelsira>
                {
                    new Embelsira
                    {
                        Emri = "Embelsira 1",
                        Perberesit = "Perberesit 1",
                        Cmimi = 1.00
                    },
                    new Embelsira
                    {
                        Emri = "Embelsira 2",
                        Perberesit = "Perberesit 2",
                        Cmimi = 1.30
                    },
                    new Embelsira
                    {
                        Emri = "Embelsira 3",
                        Perberesit = "Perberesit 3",
                        Cmimi = 1.20
                    },
                };
                await context.Embelsirat.AddRangeAsync(embelsirat);
            }


            
            await context.SaveChangesAsync();
        }
    }
}
