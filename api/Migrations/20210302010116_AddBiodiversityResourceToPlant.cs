using Microsoft.EntityFrameworkCore.Migrations;

namespace Seedling.Migrations
{
    public partial class AddBiodiversityResourceToPlant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BiodiversityResourceKey",
                table: "Plants",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BiodiversityResourceKey",
                table: "Plants");
        }
    }
}
