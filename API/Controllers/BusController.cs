using System;
using System.Threading.Tasks;
using Application.BusRides;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BusController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetBusRides([FromQuery] BusParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBusRide(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateRide(BusRide ride)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Ride = ride}));
        }
        
        [Authorize(Policy = "IsBusDriver")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditRide(Guid id, BusRide ride)
        {
            ride.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Ride = ride}));
        }

        [Authorize(Policy = "IsBusDriver")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRide(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }
    }
}