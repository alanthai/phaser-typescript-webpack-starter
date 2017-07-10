import * as Phaser from 'phaser';

import { HeroSprite } from '../units/hero.sprite';
import { Group } from '../units/group';
import { UnitType } from '../units/unit-type.type';
import { store } from '../store/store';
import { getKey } from '../keyboard/get-key';
import { KeyboardActions } from '../keyboard/keyboard.actions';
import { PlayerActions } from '../player/player.actions';

export class GameScreen extends Phaser.State {
  private platforms: Phaser.Group;
  private player: Phaser.Sprite;
  private stars: Phaser.Group;

  create(): void {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.add.sprite(0, 0, 'sky');

    this.platforms = this.initPlatforms();
    this.player = this.initPlayer();
    this.stars = this.initStars();
    this.initInventoryLayer();
    this.initKeyboard();
  }

  shutdown(): void {
    this.game.input.keyboard.destroy();
  }

  update(): void {
    this.updateStarCollection();
    this.updateStarsMovement();
  }

  private initKeyboard(): void {
    function onUp(event: KeyboardEvent) {
      store.dispatch(KeyboardActions.keyUp(getKey(event)));
    }
    function onDown(event: KeyboardEvent) {
      store.dispatch(KeyboardActions.keyDown(getKey(event)));
    }
    this.game.input.keyboard.addCallbacks(undefined, onDown, onUp);
  }

  private initPlatforms(): Group {
    const platforms = new Group(this.game);

    this.game.world.add(platforms);

    platforms.enableBody = true;

    const ground = platforms.create(0, this.game.world.height - 64, 'ground');

    ground.scale.setTo(2, 2);

    ground.unitType = UnitType.Platform;
    ground.body.immovable = true;

    const ledge = platforms.create(400, 400, 'ground');

    ledge.unitType = UnitType.Platform;
    ledge.body.immovable = true;

    const ledge2 = platforms.create(-150, 250, 'ground');

    ledge2.unitType = UnitType.Platform;
    ledge2.body.immovable = true;

    return platforms;
  }

  private initPlayer(): Phaser.Sprite {
    const player = new HeroSprite(this.game);

    this.game.world.add(player);

    return player;
  }

  private initStars(): Phaser.Group {
    const stars = this.game.add.group();

    stars.enableBody = true;

    //  Create 12 of them evenly spaced apart
    for (let i = 0; i < 12; i++) {
      //  Create a star inside of the 'stars' group
      const star = stars.create(i * 70, 0, 'star');

      star.unitType = UnitType.Collectible;

      //  Let gravity do its thing
      star.body.gravity.y = 60;

      //  This just gives each star a slightly random bounce value
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    return stars;
  }

  private initInventoryLayer() {
    const goldText = this.game.add.text(16, 16, 'Gold: 0', {
      fontSize: '32px',
      fill: '#000',
    });

    store.subscribe(state => {
      goldText.text = `Gold: ${state.player.gold}`;
    });
  }

  private updateStarCollection(): void {
    function collectStar(_, star) {
      star.kill();
      store.dispatch(PlayerActions.addGold(50));
    }

    this.game.physics.arcade.overlap(this.player, this.stars, collectStar);
  }

  private updateStarsMovement(): void {
    this.game.physics.arcade.collide(this.stars, this.platforms);
  }
}
