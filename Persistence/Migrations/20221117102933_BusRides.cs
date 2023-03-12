using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class BusRides : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BusRideId",
                table: "RideAttendees",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "BusRideId",
                table: "Comments",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BusRides",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Departure = table.Column<string>(type: "TEXT", nullable: true),
                    Destination = table.Column<string>(type: "TEXT", nullable: true),
                    departureDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    returnDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    passengerNumber = table.Column<string>(type: "TEXT", nullable: true),
                    Cost = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Baggage = table.Column<string>(type: "TEXT", nullable: true),
                    BaggageCost = table.Column<string>(type: "TEXT", nullable: true),
                    IsCancelled = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusRides", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RideAttendees_BusRideId",
                table: "RideAttendees",
                column: "BusRideId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_BusRideId",
                table: "Comments",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_BusRides_BusRideId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_RideAttendees_BusRides_BusRideId",
                table: "RideAttendees");

            migrationBuilder.DropTable(
                name: "BusRides");

            migrationBuilder.DropIndex(
                name: "IX_RideAttendees_BusRideId",
                table: "RideAttendees");

            migrationBuilder.DropIndex(
                name: "IX_Comments_BusRideId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "BusRideId",
                table: "RideAttendees");

            migrationBuilder.DropColumn(
                name: "BusRideId",
                table: "Comments");
        }
    }
}
