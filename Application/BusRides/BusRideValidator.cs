using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.BusRides
{
    public class BusRideValidator : AbstractValidator<BusRide>
    {
        public BusRideValidator()
        {
            RuleFor(x => x.Departure).NotEmpty();
            RuleFor(x => x.Destination).NotEmpty();
            RuleFor(x => x.departureDate).NotEmpty();
            RuleFor(x => x.returnDate).NotEmpty();
            RuleFor(x => x.passengerNumber).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Cost).NotEmpty();
            RuleFor(x => x.BaggageCost).NotEmpty();
        }
    }
}