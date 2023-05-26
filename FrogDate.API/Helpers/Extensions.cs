using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace FrogDate.API.Helpers
{
    public static class Extensions
    {
        public static int CalculateAge(this DateTime dateTime)
        {
            var age=DateTime.Today.Year-dateTime.Year;
            if(dateTime.AddYears(age)> DateTime.Today) 
            age--;
            return age;
        }

        public static void AddApplicationError(this HttpResponse response,string message)
        {
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Acces-Control-Expose-Headers","Application-Error");
            response.Headers.Add("Acces-Control-Allow-Orgin","*");
        }

        public static void AddPagination(this HttpResponse response,
         int currentPage, int itemsPerPage, int totalItems, int totalPages)
         {
            var paginationHeader = new PaginationHeader(currentPage,itemsPerPage,totalItems,totalPages);

            response.Headers.Add("Pagination",JsonConvert.SerializeObject(paginationHeader));
            response.Headers.Add("Acces-Control-Expose-Headers","Pagination");
         }
    }
}