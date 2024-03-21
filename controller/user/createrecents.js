const addToRecentlyPlayed = async (req, res) => {
  try {
    const { userId } = req.params;
    const songData = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    
    // Add the new song to the beginning of the recently played array
    user.recentlyPlayed.unshift(songData);
    
    // Save the updated user object
    await user.save();
    
    // Optionally, you can return the updated list
    return res.status(200).json({ success: true, recentlyPlayed: user.recentlyPlayed });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error adding song to recently played list.' });
  }
};

module.exports = addToRecentlyPlayed;
