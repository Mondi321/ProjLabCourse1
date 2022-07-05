namespace ProjLabCourse1.Profiles
{
    public class UserProfile
    {
        public Guid Id { get; set; }
        public DateTime Data { get; set; }
        public int NrPersonave { get; set; }
        public string Mesazhi { get; set; } = string.Empty;
    }
}
