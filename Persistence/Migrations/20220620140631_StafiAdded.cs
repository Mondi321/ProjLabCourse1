using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class StafiAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Gjinite",
                columns: table => new
                {
                    GjiniaId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GjiniaE = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gjinite", x => x.GjiniaId);
                });

            migrationBuilder.CreateTable(
                name: "Shtetet",
                columns: table => new
                {
                    ShtetiId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Emri = table.Column<string>(type: "TEXT", nullable: false),
                    EmriPostal = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shtetet", x => x.ShtetiId);
                });

            migrationBuilder.CreateTable(
                name: "Qytetet",
                columns: table => new
                {
                    QytetiId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Emri = table.Column<string>(type: "TEXT", nullable: false),
                    ShtetiId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Qytetet", x => x.QytetiId);
                    table.ForeignKey(
                        name: "FK_Qytetet_Shtetet_ShtetiId",
                        column: x => x.ShtetiId,
                        principalTable: "Shtetet",
                        principalColumn: "ShtetiId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stafis",
                columns: table => new
                {
                    StafiId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Emri = table.Column<string>(type: "TEXT", nullable: false),
                    Mbiemri = table.Column<string>(type: "TEXT", nullable: false),
                    Detyra = table.Column<string>(type: "TEXT", nullable: false),
                    ShtetiId = table.Column<int>(type: "INTEGER", nullable: false),
                    QytetiId = table.Column<int>(type: "INTEGER", nullable: false),
                    GjiniaId = table.Column<int>(type: "INTEGER", nullable: false),
                    Adresa = table.Column<string>(type: "TEXT", nullable: false),
                    DataLindjes = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stafis", x => x.StafiId);
                    table.ForeignKey(
                        name: "FK_Stafis_Gjinite_GjiniaId",
                        column: x => x.GjiniaId,
                        principalTable: "Gjinite",
                        principalColumn: "GjiniaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Stafis_Qytetet_QytetiId",
                        column: x => x.QytetiId,
                        principalTable: "Qytetet",
                        principalColumn: "QytetiId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Stafis_Shtetet_ShtetiId",
                        column: x => x.ShtetiId,
                        principalTable: "Shtetet",
                        principalColumn: "ShtetiId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Qytetet_ShtetiId",
                table: "Qytetet",
                column: "ShtetiId");

            migrationBuilder.CreateIndex(
                name: "IX_Stafis_GjiniaId",
                table: "Stafis",
                column: "GjiniaId");

            migrationBuilder.CreateIndex(
                name: "IX_Stafis_QytetiId",
                table: "Stafis",
                column: "QytetiId");

            migrationBuilder.CreateIndex(
                name: "IX_Stafis_ShtetiId",
                table: "Stafis",
                column: "ShtetiId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Stafis");

            migrationBuilder.DropTable(
                name: "Gjinite");

            migrationBuilder.DropTable(
                name: "Qytetet");

            migrationBuilder.DropTable(
                name: "Shtetet");
        }
    }
}
