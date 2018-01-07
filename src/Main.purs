module Main where

import Prelude
import Control.Monad.Eff (Eff)

foreign import startServer :: forall e r. Eff e Unit

main :: Eff _ Unit
main = do
  startServer
