using Microsoft.EntityFrameworkCore.Migrations;

namespace Context.Migrations
{
    public partial class isBussinessAcc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isBussinessAcc",
                table: "AspNetUsers",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isBussinessAcc",
                table: "AspNetUsers");
        }
    }
}
