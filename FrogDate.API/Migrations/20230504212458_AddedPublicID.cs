using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FrogDate.API.Migrations
{
    /// <inheritdoc />
    public partial class AddedPublicID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "public_id",
                table: "Photos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "public_id",
                table: "Photos");
        }
    }
}
