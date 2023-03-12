using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string CarModel{ get; set; }
        public string CarNumber { get; set; }
        public ICollection<DriverLiscence> DriverLiscences { get; set; }
        public ICollection<CriminalRecord> CriminalRecords { get; set; }
        public ICollection<RideAttendee> Rides {get; set;}
        public ICollection<BusAttendee> BusRides { get; set; }
        public ICollection<Photo> Photos {get; set;}
        public ICollection<UserFollowing> Followings { get; set; }
        public ICollection<UserFollowing> Followers { get; set; }
        public ICollection<Rating> RatingsHeGave { get; set; }
        public ICollection<Rating> RatingsHeWasGiven { get; set; }
        public ICollection<Refreshtoken> RefreshTokens { get; set; } = new List<Refreshtoken>();
    }
}