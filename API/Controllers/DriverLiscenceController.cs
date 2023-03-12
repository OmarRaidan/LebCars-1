using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DriverLiscense;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DriverLiscenceController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] AddLiscence.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteLiscence.Command{Id = id}));
        }
    }
}