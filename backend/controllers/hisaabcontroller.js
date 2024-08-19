const hissabModel = require("../models/hissab-model");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user-model");

const createhissab = async (req, res) => {
    try {
        // Log request body for debugging
        // console.log('Request received:', req.body);
  
        // Find the user
        let user = await UserModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
  
        let hashpass = null;
  
        // Check if encryption is required and handle accordingly
        if (req.body.isEncrypted) {
            // console.log("Encryption required");
  
            // Ensure hissabpass is provided and is a string
            if (!req.body.hissabpass || typeof req.body.hissabpass !== 'string') {
                return res.status(400).json({ error: 'Encryption passcode is required when encryption is enabled' });
            }
  
            const salt = await bcrypt.genSalt(10);
            hashpass = await bcrypt.hash(req.body.hissabpass, salt);
            // console.log("Password encrypted");
        }
  
        // Create new Hissab
        const newHissab = await hissabModel.create({
            title: req.body.title,
            content: req.body.content,
            isEditable: req.body.isEditable,
            isShareable: req.body.isShareable,
            isEncrypted: req.body.isEncrypted || false, // Ensure isEncrypted has a default value
            accessPasswordHash: hashpass,
            author: user._id,
        });
  
        // Update user's hissabs
        user.hissabs.push(newHissab._id);
        await user.save();
  
        // console.log("Hissab created successfully:", newHissab);
        res.status(201).json(newHissab);
    } catch (error) {
        // console.error("Error creating hissab:", error);
        res.status(500).json({ error: "Failed to create hissab", details: error.message });
    }
  }
  

const allHissab = async (req, res) => {
    const result = await hissabModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "data",
        },
      },
      {
        $unwind: "$data",
      },
      {
        $match: {
          "data.name": req.user.name,
        },
      },
    ]);
    res.json(result);
  }

  const sharehisaab = async (req, res) => {
    
    try {
      const hissab = await hissabModel.findOne({ _id: req.params.id });
      if (!hissab) return res.status(404).json({ error: 'Hissab not found' });
      res.json(hissab);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

const deleteHissab = async (req, res) => {
    try {
        const userid = req.user._id;
        const hissabId = req.params.id;

        // Find the hissab by its ID and ensure it matches the user's ID
        const hissab = await hissabModel.findOne({ _id: hissabId, author: userid });

        if (!hissab) {
            return res.status(404).json({ error: 'Hissab not found or not authorized to delete' });
        }

        // Delete the hissab
        await hissabModel.deleteOne({ _id: hissabId });

        res.json({ message: 'Hissab deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}



const findHissab = async (req, res) => {
    try {
        const userid = req.user._id;
        const hissabId = req.params.id;
        const hissabPass = req.body.password; // Use req.body.password to get the password from the request body

        // Find the hissab by its ID and ensure it matches the user's ID
        const hissab = await hissabModel.findOne({ _id: hissabId, author: userid });

        if (!hissab) {
            return res.status(404).json({ error: "Hissab not found" });
        }

        if (hissab.isEncrypted) {
            // Compare password if hissab is encrypted
            bcrypt.compare(hissabPass, hissab.accessPasswordHash, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: "Error comparing passwords" });
                }

                if (result) {
                    console.log("data dedo" + hissab);
                    return res.json({ data: hissab });
                } else {
                    return res.status(401).json({ error: "Incorrect password" });
                }
            });
        } else {
            // If not encrypted, return the hissab data
            return res.json({ data: hissab });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editHissab = async (req, res) => {
    try {
        const hissabId = req.params.id;
        const userid = req.user._id;

        // Find the Hissab document by ID and ensure the author matches the user
        const hissab = await hissabModel.findOne({ _id: hissabId, author: userid });

        if (!hissab) {
            return res.status(404).json({ error: 'Hissab not found or not authorized to edit' });
        }

        // Update the Hissab document with the new data
        const updatedHissab = await hissabModel.findByIdAndUpdate(
            hissabId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    isEditable: req.body.isEditable,
                    isShareable: req.body.isShareable,
                    isEncrypted: req.body.isEncrypted,
                    accessPasswordHash: req.body.isEncrypted ? await bcrypt.hash(req.body.hissabpass, await bcrypt.genSalt(10)) : hissab.accessPasswordHash,
                }
            },
            { new: true } // Return the updated document
        );

        res.json(updatedHissab);
    } catch (error) {
        console.error('Error editing hissab:', error);
        res.status(500).json({ error: 'Failed to edit hissab', details: error.message });
    }
}


module.exports = {
    createhissab,allHissab,deleteHissab,editHissab,findHissab,sharehisaab
}