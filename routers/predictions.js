const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Prediction = require('../models').prediction;
const Fixture = require('../models').fixture;

const router = new Router();

/*** POST A PREDICTION FOR A SPECIFIC FIXTURE ***/
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { pGoalsHomeTeam, pGoalsAwayTeam, fixtureId } = req.body;

  if (
    typeof pGoalsHomeTeam !== 'number' ||
    typeof pGoalsAwayTeam !== 'number' ||
    !fixtureId
  )
    return res.status(400).send('Details are missing, please try again!');

  try {
    const fixture = await Fixture.findOne({ where: { id: +fixtureId } });
    if (fixture.status === 'Matched Finished')
      return res
        .status(404)
        .json({ message: "You can't predict the outcome of a finished match" });

    const createdPrediction = await Prediction.create({
      pGoalsHomeTeam: +pGoalsHomeTeam,
      pGoalsAwayTeam: +pGoalsAwayTeam,
      userId,
      fixtureId: +fixtureId,
    });

    const prediction = {
      pGoalsAwayTeam: createdPrediction.pGoalsAwayTeam,
      pGoalsHomeTeam: createdPrediction.pGoalsHomeTeam,
      fixtureId: createdPrediction.fixtureId,
    };

    return res
      .status(201)
      .json({ prediction, message: 'Je voorspelling is geplaatst.' });
  } catch (error) {
    return res.status(400).send({ message: 'Er gaat iets mis, sorry' });
  }
});

/*** CHANGE A PREDICTION FOR A SPECIFIC FIXTURE ***/
router.patch('/:id', authMiddleware, async (req, res) => {
  const userId = +req.user.id;
  const fixtureId = +req.params.id;
  const { pGoalsHomeTeam, pGoalsAwayTeam } = req.body;

  console.log('hello');

  if (
    typeof pGoalsHomeTeam !== 'number' ||
    typeof pGoalsAwayTeam !== 'number' ||
    !fixtureId
  )
    return res.status(400).send('Details are missing, please try again!');

  try {
    const fixture = await Fixture.findOne({ where: { id: fixtureId } });
    if (fixture.status === 'Matched Finished')
      return res.status(404).json({
        message: "You can't change the prediction for a finished match!",
      });

    const predictionToUpdate = await Prediction.findOne({
      where: { fixtureId, userId },
    });

    const updatedPrediction = await predictionToUpdate.update({
      pGoalsHomeTeam: +pGoalsHomeTeam,
      pGoalsAwayTeam: +pGoalsAwayTeam,
    });

    const prediction = {
      pGoalsAwayTeam: updatedPrediction.pGoalsAwayTeam,
      pGoalsHomeTeam: updatedPrediction.pGoalsHomeTeam,
      fixtureId: updatedPrediction.fixtureId,
    };

    return res
      .status(201)
      .json({ prediction, message: 'Je voorspelling is aangepast.' });
  } catch (error) {
    return res.status(400).send({ message: 'Er gaat iets mis, sorry' });
  }
});

module.exports = router;
