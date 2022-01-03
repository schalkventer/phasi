<!-- omit in toc -->
# 🐛 Phasi

**A custom text notation used to describe and prototype nested state machines**

- [Basic Example](#basic-example)

# Basic Example

We can create a basic statemachine to describes the phases that a butterfly enters during its life as follows. 

```
---
Organism
---

egg
  grow
  hatch >> caterpillar

caterpillar
  eat
  crawl
  cocoon >> butterfly

butterfly
  fly
  mate >> egg
```

The basic syntax can be described as follows:

- The value between the `---` lines provides a name for the machine
- All lines with no whitespace at the front describe phases (in this case `egg`, `caterpillar` and `butterfly`)
- Any indented line (with whitespace at the front) describe an action nested inside a phase.
- Any actions that have `>>` at the end indicates that the action causes a transition to a new phase (the name of the target phase after the `>>`)
- Actions that do not have `>>` do not trigger transitions, but usually causes some side-effect outside the statemachine itself.

You can view the [Basic Example Demo](https://phasi.io/#---%0Aorganism%0A---%0A%0Aegg%0A%20%20grow%0A%20%20hatch%20%3E%3E%20caterpillar%20//%20first%20event%0A%0Acaterpillar%20//%20has%2012%20eyes%0A%20%20eat%20//%20goes%20munch%20munch%0A%20%20crawl%20//%20goes%20squish%20squish%0A%20%20cocoon%20%3E%3E%20butterfly%0A%0Abutterfly%0A%20%20fly%20//%20butterfly%20goes%20brrrrr%0A%20%20mate%20%3E%3E%20egg)
 to see this in action. Remember to open the panes on the right-hand side (since they are closed by default) and click on an action in the current phase to transition.

