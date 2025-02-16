import Poll from "../models/poll.model.js";

const pollControllers = {
  getPoll: async (req, res) => {
    const poll = await Poll.findOne().sort({ _id: -1 });
    if (!poll) return res.status(404).send("No poll found");
    res.json(poll);
  },
  createPoll: async (req, res) => {
    const { question, options } = req.body;
    if (!question || !options.length)
      return res.status(400).send("Invalid input");

    const newPoll = new Poll({
      question,
      options,
      votes: options.reduce((acc, opt) => ({ ...acc, [opt]: 0 }), {}),
    });

    await newPoll.save();
    res.json(newPoll);
  },
  votePoll: async (req, res) => {
    const { option } = req.body;
    const poll = await Poll.findOne().sort({ _id: -1 });
    if (!poll || !poll.options.includes(option))
      return res.status(400).send("Invalid vote");

    poll.votes.set(option, (poll.votes.get(option) || 0) + 1);
    await poll.save();
    res.json(poll);
  },
};

export default pollControllers;
