

namespace Common.Database.models
{
    public class User
    {
        public int Id { set; get; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhotoId { set; get; }
    }
}
