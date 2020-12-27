const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;

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
    return res
      .status(400)
      .send({ message: 'Details ontbreken, probeer opnieuw!' });

  try {
    const fixture = await Fixture.findOne({ where: { id: +fixtureId } });
    if (fixture.status === 'Matched Finished')
      return res.status(404).send({
        message: 'Je kan de uitslag van een afgelopen wedstrijd niet wijzigen!',
      });

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
      .send({ prediction, message: 'Je voorspelling is geplaatst.' });
  } catch (error) {
    return res.status(400).send({ message: 'Er gaat iets mis, sorry' });
  }
});

/*** CHANGE A PREDICTION FOR A SPECIFIC FIXTURE ***/
router.patch('/:id', authMiddleware, async (req, res) => {
  const userId = +req.user.id;
  const fixtureId = +req.params.id;
  const { pGoalsHomeTeam, pGoalsAwayTeam } = req.body;

  if (
    typeof pGoalsHomeTeam !== 'number' ||
    typeof pGoalsAwayTeam !== 'number' ||
    !fixtureId
  )
    return res
      .status(400)
      .send({ message: 'Details ontbreken, probeer opnieuw!' });

  try {
    const fixture = await Fixture.findOne({ where: { id: fixtureId } });
    if (fixture.status === 'Matched Finished')
      return res.status(404).send({
        message: 'Je kan de uitslag van een afgelopen wedstrijd niet wijzigen!',
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
      .send({ prediction, message: 'Je voorspelling is aangepast.' });
  } catch (error) {
    return res.status(400).send({ message: 'Er gaat iets mis, sorry' });
  }
});

module.exports = router;
