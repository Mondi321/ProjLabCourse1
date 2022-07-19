using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class BankaAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BankaId",
                table: "Stafis",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Bankat",
                columns: table => new
                {
                    BankaId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Emri = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bankat", x => x.BankaId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Stafis_BankaId",
                table: "Stafis",
                column: "BankaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stafis_Bankat_BankaId",
                table: "Stafis",
                column: "BankaId",
                principalTable: "Bankat",
                principalColumn: "BankaId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stafis_Bankat_BankaId",
                table: "Stafis");

            migrationBuilder.DropTable(
                name: "Bankat");

            migrationBuilder.DropIndex(
                name: "IX_Stafis_BankaId",
                table: "Stafis");

            migrationBuilder.DropColumn(
                name: "BankaId",
                table: "Stafis");
        }
    }
}
