using System;

namespace Domain
{
    public class BusAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid RideId { get; set; }
        public BusRide BusRide { get; set; }
        public bool IsDriver { get; set; }
    }
}