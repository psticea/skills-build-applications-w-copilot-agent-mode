from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(name='Test', email='test@example.com', team='marvel')
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.team, 'marvel')

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='marvel', members=['Test'])
        self.assertEqual(team.name, 'marvel')
        self.assertEqual(team.members, ['Test'])

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        activity = Activity.objects.create(user='Test', activity='Running', duration=30)
        self.assertEqual(activity.user, 'Test')
        self.assertEqual(activity.activity, 'Running')
        self.assertEqual(activity.duration, 30)

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        lb = Leaderboard.objects.create(team='marvel', points=100)
        self.assertEqual(lb.team, 'marvel')
        self.assertEqual(lb.points, 100)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name='Cardio', suggested_for=['Test'])
        self.assertEqual(workout.name, 'Cardio')
        self.assertEqual(workout.suggested_for, ['Test'])
