using FrogDate.API.Data;
using FrogDate.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace FrogDate.API.Controllers;
[Authorize]
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
    public async Task<IActionResult> GetValues()
    {
        var values =await _context.Values.ToListAsync();
        return Ok(values);
    }
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetValue(int id)
    {
        var value=await _context.Values.FirstOrDefaultAsync(x=>x.Id==id);
        return Ok(value);
    }
    [HttpPost]
    public async Task<IActionResult> AddValue([FromBody] Value value)
    {
        _context.Values.Add(value);
        await _context.SaveChangesAsync();
        return Ok(value);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> EditValues(int id,[FromBody] Value value)
    {
         var data= await _context.Values.FindAsync(id);
         if (data==null) return NoContent();
         data.Name=value.Name;
        _context.Values.Update(data);
        await _context.SaveChangesAsync();
         return Ok(data);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteValue(int id)
    {
        var data=await _context.Values.FindAsync(id);
        _context.Values.Remove(data);
         await _context.SaveChangesAsync();
        return Ok(data);
    }
}
