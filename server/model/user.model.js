import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: '',
    },

    profileUrl: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    likedProfiles: {
      type: [String],
      default: [],
    },

    likedBy: [
      {
        username: {
          type: String,
          required: true,
        },
        avatarUrl: {
          type: String,
        },
        likedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);
export default User;
// {
//   "username": "likedUser",
//   "name": "Liked User",
//   "profileUrl": "https://example.com/likeduser",
//   "avatarUrl": "https://example.com/likeduser_avatar.jpg",
//   "likedProfiles": ["currentUser", "user2", "user3"],
//   "likedBy": [
//     {
//       "username": "currentUser",
//       "avatarUrl": "https://example.com/currentuser_avatar.jpg",
//       "likedDate": "2024-03-11T12:00:00.000Z"
//     },
//     {
//       "username": "user2",
//       "avatarUrl": "https://example.com/user2_avatar.jpg",
//       "likedDate": "2024-03-11T12:30:00.000Z"
//     },
//     {
//       "username": "user3",
//       "avatarUrl": "https://example.com/user3_avatar.jpg",
//       "likedDate": "2024-03-11T13:00:00.000Z"
//     }
//   ],
//   "createdAt": "2024-03-10T08:00:00.000Z",
//   "updatedAt": "2024-03-11T13:00:00.000Z"
// }
