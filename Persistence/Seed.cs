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
                        Emri = "Island Iced Tea",
                        Perberesit = "tea, orange juice, lime juice",
                        Cmimi = 1.50
                    },
                    new Pije
                    {
                        Emri = "Cuba Libre",
                        Perberesit = "orange juice, gin, white rum",
                        Cmimi = 2.00
                    },
                    new Pije
                    {
                        Emri = "Cosmopolitan",
                        Perberesit = "tequila, lime juice, vodka",
                        Cmimi = 2.50
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
                        Emri = "Cheese Cake",
                        Perberesit = "chocolate, cheese, cream, butter",
                        Cmimi = 1.50
                    },
                    new Embelsira
                    {
                        Emri = "Chocolate Cake",
                        Perberesit = "chocolate, cheese, cream, butter",
                        Cmimi = 1.70
                    },
                    new Embelsira
                    {
                        Emri = "Chocolate Cake1",
                        Perberesit = "chocolate, cheese, cream, butter",
                        Cmimi = 1.80
                    },
                };
                await context.Embelsirat.AddRangeAsync(embelsirat);
            }

            if (!context.Contacts.Any())
            {
                var contacts = new List<Contact>
                {
                    new Contact
                    {
                        Emri = "emri 1",
                        Email = "emri1@test.com",
                        Subject = "Problem 1",
                        Numri = 044111111,
                        Mesazhi = "Mesazhi 123456"
                    },
                    new Contact
                    {
                        Emri = "emri 2",
                        Email = "emri2@test.com",
                        Subject = "Problem 2",
                        Numri = 044111222,
                        Mesazhi = "Mesazhi 2222222"
                    }
                };
                await context.Contacts.AddRangeAsync(contacts);
            }

            if (!context.Eventet.Any())
            {
                var eventet = new List<Eventi>
                {
                    new Eventi
                    {
                        Titulli = "Birthday Party",
                        Pershkrimi = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quae accusamus neque porro eos eum vel ipsa illo dicta? Architecto qui quos illum aliquam officiis facere modi hic, dolor vero.",
                        Cmimi = 169
                    },
                    new Eventi
                    {
                        Titulli = "Birthday Party",
                        Pershkrimi = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quae accusamus neque porro eos eum vel ipsa illo dicta? Architecto qui quos illum aliquam officiis facere modi hic, dolor vero.",
                        Cmimi = 179
                    },
                    new Eventi
                    {
                        Titulli = "Birthday Party",
                        Pershkrimi = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quae accusamus neque porro eos eum vel ipsa illo dicta? Architecto qui quos illum aliquam officiis facere modi hic, dolor vero.",
                        Cmimi = 200
                    }
                };
                await context.Eventet.AddRangeAsync(eventet);
            }


            await context.SaveChangesAsync();
        }
    }
}
