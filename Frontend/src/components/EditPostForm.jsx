import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

function EditPostForm({ editingPost, setEditingPost, handleUpdatePost }) {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <form onSubmit={handleUpdatePost}>
        <CardHeader>
          <CardTitle>Editar Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1 5">
              <Label htmlFor="title">Título:</Label>
              <Input
                id="title"
                value={editingPost.title}
                onChange={(e) =>
                  setEditingPost({
                    ...editingPost,
                    title: e.target.value,
                  })
                }
                required
              />
            </div>         
            <div className="flex flex-col space-y-1 5">
              <Label htmlFor="contend-edit">Conteúdo:</Label>
              <Textarea
                id="content-edit"
                value={editingPost.content}
                onChange={(e) =>
                  setEditingPost({
                    ...editingPost,
                    content: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-beetween">
          <Button type="submit">Atualizar Post</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditingPost(null)}
          >
            Cancelar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default EditPostForm;
