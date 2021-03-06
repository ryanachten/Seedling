using Microsoft.EntityFrameworkCore.Migrations;

namespace Seedling.Migrations
{
    public partial class AddPlanttUserRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Plants",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Plants_UserId",
                table: "Plants",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plants_Users_UserId",
                table: "Plants",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plants_Users_UserId",
                table: "Plants");

            migrationBuilder.DropIndex(
                name: "IX_Plants_UserId",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Plants");
        }
    }
}
