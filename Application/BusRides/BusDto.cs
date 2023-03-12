using System;
using System.Collections.Generic;

namespace Application.BusRides
{
    public class BusDto
    {
        public Guid Id { get; set; }
        public string Departure { get; set; }
        public string Destination { get; set; }
        public DateTime departureDate { get; set; }
        public DateTime returnDate { get; set; }
        public string passengerNumber { get; set; }
        public string Cost { get; set; }
        public string Description { get; set; }
        public string Baggage { get; set; }
        public string BaggageCost { get; set; }
        public bool IsCancelled { get; set; }
        public string DriverUsername { get; set; }
        public ICollection<BusAttendeeDto> Attendees { get; set; }
    }
}