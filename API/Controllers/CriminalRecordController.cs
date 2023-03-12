using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.CriminalRecord;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CriminalRecordController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Add.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}