import { connect } from 'mongoose';

export const connectDb = async (mongoConnectUri: string) => {
	await connect(mongoConnectUri)
		.then(() => {
			console.log('MongoDB connection established succesfully');
		})
		.catch(err => {
			throw new Error(err);
		});
};
