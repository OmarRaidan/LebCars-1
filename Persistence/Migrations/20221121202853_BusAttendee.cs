using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class BusAttendee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_BusRides_BusRideId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_RideAttendees_BusRides_BusRideId",
                table: "RideAttendees");

            migrationBuilder.DropIndex(
                name: "IX_RideAttendees_BusRideId",
                table: "RideAttendees");

            migrationBuilder.DropColumn(
                name: "BusRideId",
                table: "RideAttendees");

            migrationBuilder.CreateTable(
                name: "BusAttendees",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "TEXT", nullable: false),
                    RideId = table.Column<Guid>(type: "TEXT", nullable: false),
                    IsDriver = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusAttendees", x => new { x.AppUserId, x.RideId });
                    table.ForeignKey(
                        name: "FK_BusAttendees_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BusAttendees_BusRides_RideId",
                        column: x => x.RideId,
                        principalTable: "BusRides",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BusAttendees_RideId",
                table: "BusAttendees",
                column: "RideId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_BusRides_BusRideId",
                table: "Comments",
                column: "BusRideId",
                principalTable: "BusRides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_BusRides_BusRideId",
                table: "Comments");

            migrationBuilder.DropTable(
                name: "BusAttendees");

            migrationBuilder.AddColumn<Guid>(
                name: "BusRideId",
                table: "RideAttendees",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RideAttendees_BusRideId",
                table: "RideAttendees",
                column: "BusRideId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_BusRides_BusRideId",
                table: "Comments",
                column: "BusRideId",
                principalTable: "BusRides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RideAttendees_BusRides_BusRideId",
                table: "RideAttendees",
                column: "BusRideId",
                principalTable: "BusRides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
