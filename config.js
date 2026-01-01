/**
 * 🎉 FRIEND CONFIGURATION FILE 🎉
 * 
 * Edit this file to add your friends and their personalized messages!
 * 
 * For INDIVIDUALS:
 *   - firstName: Their first name (used for login)
 *   - lastName: Their last name (used for login)
 *   - nickname: (optional) Display name instead of firstName (e.g., "Suki" instead of "Aasmi")
 *   - password: The secret password you give them
 *   - finalMessage: The message revealed in the envelope
 *   - memories: (optional) Array of favorite memories with this person
 * 
 * For FAMILIES/COUPLES (two members):
 *   - firstName: First person's name (used for login)
 *   - lastName: First person's last name (used for login)
 *   - nickname: (optional) Display nickname for first person
 *   - firstName2: Second person's name (used for login)
 *   - lastName2: (optional) Second person's last name if different
 *   - nickname2: (optional) Display nickname for second person
 *   - password: The secret password
 *   - finalMessage: The message for the family
 *   - memories: (optional) Array of favorite memories
 *   
 *   Login: Either member can enter their name + password
 *   Display: Uses nickname if present, otherwise firstName
 */

const FRIENDS_CONFIG = {
  // Your name (shown as "From: [senderName]")
  senderName: "Rachna",

  // Add your friends and families here!
  friends: [
    // Example: Individual friend
    {
      firstName: "Aasmi",
      lastName: "Joshi",
      password: "suki",
      finalMessage: "Happy New Year mero baini, this year has been truly wonderful with you and I am super exicited to enter 2026 together. I hope this year brings manny good news for yourself, I really hope you get selected for the best possible program and get to meet your family soon. Dherai kamaunu, suddha khanu ani gyani bannu. Thank you for always loving and being part of my greatful world.💕✨🎊",
      memories: [
        "Our late night chai sessions 🍵",
        "Shopping adventures at the mall 🛍️"
      ]
    },

    // Example: Another friend
    {
      firstName: "Divya",
      lastName: "Koirala",
      password: "danka",
      finalMessage: "Happy New Year sweetheart 2025 was amazing with you and I wish to make 2026 even more memorable. I hope we get to spend more time together and create more meaningful memories. Thank you for taking care of me when I needed and celeberating me this year. Cheers to an amazing year ahead full of love, laughter, luck and peace.💕🎊",
      memories: [
        "Our first meetup ☕",
        "Birthday celebrations 🎂",
        "Long phone calls 📱",
        "Road trips together 🚗",
        "Supporting each other always 💪"
      ]
    },

    // Example: Another friend
    {
      firstName: "Roshani",
      lastName: "Acharya",
      nickname: "Didi",
      password: "ml/ai",
      finalMessage: "Happy New Year 2026, I am super excited to meet you this year and create memories together. I hope this year brings you peace, good health, lots of opportunities and protection. Love you",
      memories: [
        "Meeting you for the first time in Kathmandu.",
        "Visitin your childhood home.",
        "Bouddha and Bhaktapur ma ghumeko.",
        "Butwal ko sekuwa try gareko and getting to know you better.",
        "You sharing news about your US Visa."
      ]
    },

    // Example: Another individual
    {
      firstName: "Jane",
      lastName: "Smith",
      password: "celebrate2025",
      finalMessage: "Here's to new adventures, new dreams, and new beginnings in 2025! You deserve all the happiness in the world! 🌟💖🎆",
      memories: [
        "Coffee dates ☕",
        "Weekend brunches 🥐",
        "Book club meetings 📚"
      ]
    },

    // Add more below! Copy the format above:
    // 
    // Individual:
    // {
    //   firstName: "Friend",
    //   lastName: "Name",
    //   password: "secretpassword",
    //   finalMessage: "Your message here!",
    //   memories: [
    //     "Memory 1 🌟",
    //     "Memory 2 💕",
    //     "Memory 3 ✨"
    //   ]
    // },
  ]
};

// Don't modify below this line
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FRIENDS_CONFIG;
}
