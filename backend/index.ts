import cors from 'cors'
import express from 'express'
import { getAllMessages } from './libs/displaydata'
import { executeInsertMessage } from './libs/transactions'

//instantiate express app
const app = express();

app.use(cors());
app.use(express.json());



//body


// executeInsertMessage('Second MSG Test'); 

getAllMessages();
// executeInsertMessage("LEkjhgfghjkjhgfdO").then(() => lookup());
