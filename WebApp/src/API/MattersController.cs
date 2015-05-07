using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using Meridian.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Meridian.API
{
    [Route("api/[controller]")]
    public class MattersController : Controller
    {
        // GET: api/matters
        [HttpGet]
        public IEnumerable<Matter> Get()
        {
            List<Matter> matterList = new List<Matter>();

            Client client1 = new Client();
            Matter matter1 = new Matter();
            return matterList;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
