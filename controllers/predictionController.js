const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getFixture } = require('../queries/fixtureQuery');
const { createPrediction } = require('../queries/predictionQuery');

exports.postPrediction = catchAsync(async (req, res, next) => {
  // TODO get logged in user
  const userId = 1;
  const { pGoalsHomeTeam, pGoalsAwayTeam, fixtureId } = req.body;

  if (
    typeof pGoalsHomeTeam !== 'number' ||
    typeof pGoalsAwayTeam !== 'number' ||
    !fixtureId
  ) {
    next(new AppError('Details ontbreken, probeer opnieuw!', 404));
    return;
  }

  const fixture = await getFixture(fixtureId);

  if (fixture.status === 'Matched Finished') {
    next(
      new AppError(
        'Je kan de uitslag van een afgelopen wedstrijd niet wijzigen!',
        404,
      ),
    );
    return;
  }

  const createdPrediction = await createPrediction(
    pGoalsHomeTeam,
    pGoalsAwayTeam,
    userId,
    fixtureId,
  );

  const prediction = {
    pGoalsAwayTeam: createdPrediction.pGoalsAwayTeam,
    pGoalsHomeTeam: createdPrediction.pGoalsHomeTeam,
    fixtureId: createdPrediction.fixtureId,
  };

  res.status(201).json({
    status: 'success',
    data: {
      prediction,
    },
    message: 'Je voorspelling is geplaatst.',
  });
});
// });

// /*** CHANGE A PREDICTION FOR A SPECIFIC FIXTURE ***/
// router.patch('/:id', authMiddleware, async (req, res) => {
//   const userId = +req.user.id;
//   const fixtureId = +req.params.id;
//   const { pGoalsHomeTeam, pGoalsAwayTeam } = req.body;

//   if (
//     typeof pGoalsHomeTeam !== 'number' ||
//     typeof pGoalsAwayTeam !== 'number' ||
//     !fixtureId
//   )
//     return res
//       .status(400)
//       .send({ message: 'Details ontbreken, probeer opnieuw!' });

//   try {
//     const fixture = await Fixture.findOne({ where: { id: fixtureId } });
//     if (fixture.status === 'Matched Finished')
//       return res.status(404).send({
//         message: 'Je kan de uitslag van een afgelopen wedstrijd niet wijzigen!',
//       });

//     const predictionToUpdate = await Prediction.findOne({
//       where: { fixtureId, userId },
//     });

//     const updatedPrediction = await predictionToUpdate.update({
//       pGoalsHomeTeam: +pGoalsHomeTeam,
//       pGoalsAwayTeam: +pGoalsAwayTeam,
//     });

//     const prediction = {
//       pGoalsAwayTeam: updatedPrediction.pGoalsAwayTeam,
//       pGoalsHomeTeam: updatedPrediction.pGoalsHomeTeam,
//       fixtureId: updatedPrediction.fixtureId,
//     };

//     return res
//       .status(201)
//       .send({ prediction, message: 'Je voorspelling is aangepast.' });
//   } catch (error) {
//     return res.status(400).send({ message: 'Er gaat iets mis, sorry' });
//   }
// });
