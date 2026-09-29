<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the arena footprint in `ROOM.r`, scaled `Room` geometry, and scaled collision solids synchronized; the compact arena must use identical visible and physical bounds.
- Keep the home arena showcase in a separate Canvas from the live game World so menu animation never advances gameplay state.
