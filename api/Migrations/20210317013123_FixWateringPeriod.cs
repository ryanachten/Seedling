using Microsoft.EntityFrameworkCore.Migrations;

namespace Seedling.Migrations
{
    public partial class FixWateringPeriod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WateringPriod",
                table: "Plants",
                newName: "WateringPeriod");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WateringPeriod",
                table: "Plants",
                newName: "WateringPriod");
        }
    }
}
