import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";

export async function getUsersForSidebar(req, res) {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("❌ Error in getUsersForSidebar controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMessages(req, res) {
  try {
    const senderId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("❌ Error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function sendMessage(req, res) {
  try {
    const senderId = req.user._id;
    const { text, image } = req.body;
    const { id: receiverId } = req.params;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // TODO: add realtime (socket.io)

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("❌ Error in sendMessage controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
