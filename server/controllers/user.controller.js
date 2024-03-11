import User from '../model/user.model.js';
export const getUserProfileAndRepos = async (req, res) => {
  const { username } = req.params;
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
        // authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`,
      },
    });
    const userProfile = await userRes.json();
    const repoRes = await fetch(userProfile.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const repos = await repoRes.json();
    res.status(200).json({ userProfile, repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//
export const likeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user._id.toString()); //? userByLike which is currently login
    const userToLike = await User.findOne({ username });
    if (!userToLike) {
      res.status(400).json({ error: 'User already exist' });
    }
    // ? user current which is login is like to some one else
    if (user.likedProfiles.includes(userToLike.username)) {
      return res.status(400).json({ error: 'User already liked' });
    }
    // ? the useToLike get the like count in his likedBy property in which the current user is like that userToLike profile by send the
    // ? logined user => username, avatarUrl,likedDate
    // ? it get the increase count of likes in the userToLike profile
    // ? by the user which is login
    userToLike.likedBy.push({
      username: user.username,
      avatarUrl: user.avatarUrl,
      likedDate: Date.now(),
    });
    // ? now i want to push the username of userToLike which the user("currently login")
    // ? into the likedProfile
    // ?following=>likedProfile
    // ? follower=>likedBy
    //
    // ? userToLike=> likedBy:user["userByLike,currently login"],likedProfile:[]
    // ?user[userByLike,currentlylogin]====>likedBy:[],likedProfile:[userToLike]

    user.likedProfiles.push(userToLike.username);
    await Promise.all([userToLike.save(), user.save()]);
    res.status(200).json({ message: 'user liked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//
export const getLikes = async (req, res) => {
  try {
    // ?the current user fetch the users which were liked the current login profile
    // ? so in the likedBy array all the users are there which were liked our profile
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({ likedBy: user.likedBy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
