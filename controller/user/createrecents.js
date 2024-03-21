const User = require('../../models/userModel'); // Import your User model

const addToRecentlyPlayed = async (userId, songData) => {
  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    // Add the new song to the beginning of the recently played array
    user.recentlyPlayed.unshift(songData);
    // Save the updated user object
    await user.save();
    return user.recentlyPlayed; // Optionally, you can return the updated list
  } catch (error) {
    console.error(error);
    throw new Error('Error adding song to recently played list.');
  }
};

module.exports = addToRecentlyPlayed;
