using FrogDate.API.Data;
using FrogDate.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace FrogDate.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ValuesController : ControllerBase
{
    private readonly DataContext _context;
    public ValuesController(DataContext context)
    {
        _context=context;
    }

    [HttpGet]
    public IActionResult GetValues()
    {
        var values = _context.Values.ToList();
        return Ok(values);
    }
    [HttpGet("{id}")]
    public IActionResult GetValue(int id)
    {
        var value=_context.Values.FirstOrDefault(x=>x.Id==id);
        return Ok(value);
    }
    [HttpPost]
    public IActionResult AddValue([FromBody] Value value)
    {
        _context.Values.Add(value);
        _context.SaveChanges();
        return Ok(value);
    }
    [HttpPut("{id}")]
    public IActionResult EditValues(int id,[FromBody] Value value)
    {
         var data=_context.Values.Find(id);
         data.Name=value.Name;
         _context.Values.Update(data);
         _context.SaveChanges();
         return Ok(data);
    }
    [HttpDelete("{id}")]
    public IActionResult DeleteValue(int id)
    {
        var data=_context.Values.Find(id);
        _context.Values.Remove(data);
        _context.SaveChanges();
        return Ok(data);
    }
}