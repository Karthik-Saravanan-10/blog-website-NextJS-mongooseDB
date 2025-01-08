import mongoose from "mongoose";

const connection: { isConnected?: number } = {}

export async function connect() {
    console.log("connected db")
    if (connection.isConnected) {
        return
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected == 1) {
            return
        }
        await mongoose.disconnect()
    }

    const db = await mongoose.connect(process.env.MONGODB_URL as string)
    connection.isConnected = db.connections[0].readyState
}

export async function disconnect() {
    console.log("disconnected db")
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = 0;
        }
    }
}

const db = { connect, disconnect };
export default db;


// import mongoose from 'mongoose';

// const connection: { isConnected?: number} = {};

// async function connect(){
//     if (connection.isConnected) {
//         return;
//     }
//     if (mongoose.connections.length > 0) {
//         connection.isConnected = mongoose.connections[0].readyState;
//         if (connection.isConnected === 1) {
//             return;
//         }
//         await mongoose.disconnect();
//     }
//     const db = await mongoose.connect(process.env.MONGODB_URL as string);
//     connection.isConnected = db.connections[0].readyState;
// }

// async function disconnect(){
//     if (connection.isConnected) {
//         if (process.env.NODE_ENV === 'production') {
//             await mongoose.disconnect();
//             connection.isConnected = 0;
//         }
//     }
// }
