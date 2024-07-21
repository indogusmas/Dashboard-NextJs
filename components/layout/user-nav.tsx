import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

export default function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative rounded-full">
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>I</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
