using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.BusRides
{
    public class BusAttendeeDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string CarModel{ get; set; }
        public string CarNumber { get; set; }
        public string PhoneNumber { get; set; }
        public bool Following { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
        public ICollection<DriverLiscence> DriverLiscences { get; set; }
        public ICollection<Domain.CriminalRecord> CriminalRecords { get; set; }
    }
}