import User from '../schema/user';
import {searchUserById} from '../repository/user'
import {userInfoType} from './types/userTypes'

export async function followUser(req:any, res:any) {

  console.log('req.body',req.body)  

    const userId = req.params.userId;
    const loggedInUserId = req.body.id; // Get logged-in user's ID from authentication middleware
  
    try {
      const userToFollow = await User.findById(userId);
      const loggedInUser = await User.findById(loggedInUserId);
  
      if (!userToFollow || !loggedInUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!loggedInUser.following.includes(userId)) {
        loggedInUser.following.push(userId);
        userToFollow.followers.push(loggedInUserId);
        await loggedInUser.save();
        await userToFollow.save();
        res.json({ message: 'User followed successfully',followStatus:'following' });
      }
      else
       // Check if the logged-in user is following the target user
       if (loggedInUser.following.includes(userId)) {
        // Remove the target user from the following list of the logged-in user
        loggedInUser.following = loggedInUser.following.filter(id => id.toString() !== userId);
        // Remove the logged-in user from the followers list of the target user
        userToFollow.followers = userToFollow.followers.filter(id => id.toString() !== loggedInUserId);
        await loggedInUser.save();
        await userToFollow.save();
        res.json({ message: 'User unfollowed successfully',followStatus:'unfollowing' });
      }
  
    } catch (error) {
      console.error('Error following user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  export async function unfollowUser(req:any, res:any) {
    const userId = req.params.userId;
    const loggedInUserId = req.body.id; // Get logged-in user's ID from authentication middleware
  
    try {
      const userToUnfollow = await User.findById(userId);
      const loggedInUser = await User.findById(loggedInUserId);
  
      if (!userToUnfollow || !loggedInUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the logged-in user is following the target user
      if (loggedInUser.following.includes(userId)) {
        // Remove the target user from the following list of the logged-in user
        loggedInUser.following = loggedInUser.following.filter(id => id.toString() !== userId);
        // Remove the logged-in user from the followers list of the target user
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== loggedInUserId);
        await loggedInUser.save();
        await userToUnfollow.save();
      }
  
      res.json({ message: 'User unfollowed successfully' });
    } catch (error) {
      console.error('Error unfollowing user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

export async function getAuthorInfo(req:any,res:any){
  const userId = req.params.userId;
  console.log('userId',userId)
  try{
    await searchUserById(userId).then((user:any)=>{
      if(user){
        const {name,displayName,bio,followers,respect,blogs} : userInfoType = user
        var blogsCount= blogs.length
        var followersCount = followers.length
        res.json({name,displayName,bio,followersCount,respect,blogsCount,blogs})
      }
      else{
        res.json({message:'User not found'})
      }
    })

  }catch(error){
    console.error('Error getting author info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}