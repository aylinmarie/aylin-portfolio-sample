# Knit Counter — iOS App

A sleek knitting counter app built with React Native and Material Design 3.

## Features

### Counter
- Create multiple named counters (row counter, stitch counter, pattern repeat, etc.)
- Set a goal for each counter with a visual progress bar
- Increment / decrement with animated feedback
- Reset individual counters or all at once
- Persistent storage — your counts survive app restarts
- Long-press a counter to edit its name, goal, or delete it
- Dark mode support

### Knowledge Base
- Browse video tutorials organized by category:
  - Cast On (Long Tail, German Twisted, Provisional, Knitted)
  - Knit & Purl (Continental vs English, decreases, increases)
  - Bind Off (Basic, Stretchy, Three-Needle)
  - Cables (intro, without cable needle, reading charts)
  - Lace (intro, lifelines)
  - Colorwork (stranded, intarsia, carrying yarn)
  - Fix Mistakes (dropped stitch, frogging, tinking, twisted stitch, yarn overs)
- Search across titles, descriptions, and tags
- Filter by category
- Video links from **Woolen Gang** — to be connected

## Tech Stack

| Library | Purpose |
|---|---|
| React Native 0.73 | iOS/Android framework |
| React Native Paper 5 | Material Design 3 components |
| React Navigation 6 | Bottom tab + stack navigation |
| AsyncStorage | Persistent counter storage |
| React Native Vector Icons | Material Community Icons |

## Setup

```bash
# Install dependencies
npm install

# iOS (requires Xcode + CocoaPods)
cd ios && pod install && cd ..
npm run ios

# Android
npm run android
```

## Adding Woolen Gang Videos

Once the Woolen Gang channel link is available, update `src/data/tutorials.ts` and set the `videoUrl` field for each tutorial:

```ts
{
  id: 'fx-01',
  title: 'Fixing a Dropped Stitch',
  videoUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID', // add here
  ...
}
```

The app will automatically show a play button on the tutorial card and detail screen once a URL is set.
