using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Seedling.Migrations
{
    public partial class UpdatePlantModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastWatered",
                table: "Plants",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "WateringFrequency",
                table: "Plants",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WateringPriod",
                table: "Plants",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastWatered",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "WateringFrequency",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "WateringPriod",
                table: "Plants");
        }
    }
}
