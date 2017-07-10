/// <reference path="../node_modules/phaser/typescript/phaser.comments.d.ts" />

declare const require;

require('p2');
require('pixi');

import * as Phaser from 'phaser';

import { GameScreen, SplashScreen, Screen } from './screens';

const game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');

game.state.add(Screen.Game as string, GameScreen, false);
game.state.add(Screen.Splash as string, SplashScreen, false);

game.state.start(Screen.Splash as string);
